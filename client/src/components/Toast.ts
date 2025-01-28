import toast from 'react-hot-toast'

export const Toast = async <T>(
  promise: Promise<T>,
  options?: { loading?: string; success?: string; error?: string }
): Promise<T> => {
  return toast.promise<T>(
    promise,
    {
      loading: options?.loading ?? "Loading",
      success: options?.success ?? "Success!",
      error: options?.error ?? "Oops! Something went wrong!",
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 2000,
        icon: '🔥',
      },
    }
  );
};
