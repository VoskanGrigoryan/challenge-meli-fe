import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import ToastNotification from "@/src/components/toast/ToastNotification";

interface ToastOptions {
  message: string;
  title?: string;
  color?: "green" | "red" | "blue" | "yellow" | "gray";
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions & { visible: boolean }>({
    message: "",
    title: "",
    color: "green",
    duration: 3000,
    visible: false,
  });

  const showToast = useCallback((options: ToastOptions) => {
    setToast({ ...options, visible: true });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
          <ToastNotification
            title={toast.title}
            message={toast.message}
            color={toast.color}
            duration={toast.duration}
            onClose={() => setToast((t) => ({ ...t, visible: false }))}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
}
