import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/axiosError';

type ErrorHandlerOptions = {
  showToast?: boolean;
  prefix?: string;
};

export function useErrorHandler() {
  const handleError = (error: unknown, options?: ErrorHandlerOptions) => {
    const { showToast = true, prefix = 'Erro' } = options || {};
    
    const message = getErrorMessage(error);
    const fullMessage = `${prefix}: ${message}`;
    
    if (showToast) {
      toast.error(fullMessage);
    }
    
    console.error(fullMessage, error);
    
    return message;
  };

  return { handleError };
}
