import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { toast, Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
export const AppContext = createContext();

let domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SOCKET_DOMAIN
    : "http://localhost:5000";

let path =
  process.env.NODE_ENV === "production"
    ? "/demo/api/v1/stream"
    : "/api/v1/stream";

function debounce(fn, ms = 1000) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

// const pendingRealTimeDashboardData = [];

function AppContextProvider({ children }) {
  const [realTimeDashboardData, setRealTimeDashboardData] = useState([]);
  const [realTimeDeviceViewData, setRealTimeDeviceViewData] = useState([]);
  const [realTimeWarningData, setRealTimeWarningData] = useState({});
  const [realTimeWarningCount, setRealTimeWarningCount] = useState({});

  const pendingRealTimeDashboardData = useRef([]);
  const pendingRealTimeDeviceViewData = useRef([]);

  const [error, setError] = useState({
    isError: false,
    message: ""
  })

  const [success, setSuccess] = useState({
    isSuccess: false,
    message: ""
  })

  const debouncedSetRealTimeDashboardData = useMemo(
    () =>
      debounce(() => {
        setRealTimeDashboardData(
          pendingRealTimeDashboardData.current.splice(0)
        );
      }),
    [setRealTimeDashboardData]
  );

  const debouncedSetRealTimeDeviceView = useMemo(
    () =>
      debounce(() => {
        setRealTimeDeviceViewData(
          pendingRealTimeDeviceViewData.current.splice(0)
        );
      }),
    [setRealTimeDeviceViewData]
  );

  useEffect(() => {
    const socket = io(domain, {
      path,
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      // clear buffer
      socket.sendBuffer = [];

      socket.on("data", (data) => {
        if (data.page === "DASH_BOARD") {
          pendingRealTimeDashboardData.current.push(data);
          debouncedSetRealTimeDashboardData();
        } else if (data.page === "DEVICE_VIEW") {
          pendingRealTimeDeviceViewData.current.push(data);
          debouncedSetRealTimeDeviceView();
        } else if (data.page === "WARNING") {
          setRealTimeWarningData(data);
        }
        if (data.type === "WARNING_COUNT") {
          setRealTimeWarningCount(data);
        }
      });
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

  const showToast = (message, type) => toast[type](message, { duration: 2000 });

  useEffect(() => {
    if (error.isError) {
      showToast(error.message, "error")
    }
  }, [error])

  useEffect(() => {
    if (success.isSuccess) {
      showToast(success.message, "success")
    }
  }, [success])

  return (
    <AppContext.Provider
      value={{
        realTimeDashboardData,
        realTimeDeviceViewData,
        realTimeWarningData,
        realTimeWarningCount,
        setError,
        setSuccess
      }}
    >
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </AppContext.Provider>
  );
}

export default AppContextProvider;

export const useApp = () => {
  const context = React.useContext(AppContext);
  return context;
};
