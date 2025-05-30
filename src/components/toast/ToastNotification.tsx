"use client";

import { Notification } from "@mantine/core";
import React, { useEffect, useState } from "react";
import styles from "./ToastNotification.module.css";

interface ToastNotificationProps {
  message: string;
  title?: string;
  color?: "green" | "red" | "blue" | "yellow" | "gray";
  duration?: number;
  onClose?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  title = "Notificación",
  color = "green",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsVisible(false), duration - 1000);
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  if (!shouldRender) return null;

  return (
    <Notification
      className={`${styles.toast} ${!isVisible ? styles.fadeOut : ""}`}
      withBorder
      color={color}
      title={title}
      style={{ width: "fit-content" }}
    >
      {message}
    </Notification>
  );
};

export default ToastNotification;
