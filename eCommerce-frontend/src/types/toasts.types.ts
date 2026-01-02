export interface IToast {
  id?: string;
  type: "primary" | "success" | "warning" | "danger";
  title?: string | null;
  message: string;
}
