import { Alert, Snackbar } from "@mui/material";

type NotificationPropsType = {
  isOpen: boolean;
  text: string;
  type: 'error' | 'success' | 'info';
}

export default function Notification({ isOpen, text, type } : NotificationPropsType) {
  return (
    <Snackbar
      open={isOpen}
    >
      <Alert severity={type} variant="filled">{text}</Alert>
    </Snackbar>
  )
}
