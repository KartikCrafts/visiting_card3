import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by Haya Graphics ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearAndReload = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#FAF7F2] border border-[#DECFC0] p-8 text-center shadow-xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4ECE3] border border-[#DECFC0] flex items-center justify-center text-neutral-900">
              <ShieldAlert className="w-7 h-7 text-neutral-800" />
            </div>
            
            <h2 className="text-2xl font-bold font-['Playfair_Display',serif] text-neutral-900">
              Application Safe Restored
            </h2>
            
            <p className="text-xs text-neutral-700 leading-relaxed">
              A temporary runtime condition was safely isolated by the system error guard. All cached card catalogs and prices remain protected.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Application</span>
              </button>
              <button
                onClick={this.handleClearAndReload}
                className="py-3 px-4 rounded-xl bg-white hover:bg-[#F4ECE3] text-neutral-800 font-bold text-xs border border-[#DECFC0] transition-colors"
              >
                Reset Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
