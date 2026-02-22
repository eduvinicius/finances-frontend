import type { IReactNode } from '@/shared/types/reactTypes';
import { Component } from 'react';

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<IReactNode, State> {
  constructor(props: IReactNode) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-red-900">
              Algo deu errado
            </h1>
            <p className="mb-4 text-red-700">
              {this.state.error?.message || 'Um erro inesperado ocorreu'}
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
