interface ScrollContainerProps {
  children: React.ReactNode;
}

const ScrollContainer = ({ children }: ScrollContainerProps) => (
  <div className="overflow-auto w-full md:w-4/5 lg:w-full lg:max-w-col 2col:max-w-col2 2col:flex 2col:justify-between 2col:flex-wrap 3col:w-col3 3col:max-w-col3 h-[calc(100vh-9.75rem)] md:h-[calc(100vh-12.25rem)] lg:h-[calc(100dvh-13.25rem)] lg:scrollbar-thin lg:scrollbar-thumb-rounded-xl lg:scrollbar-track-transparent lg:scrollbar-thumb-fog dark:lg:scrollbar-thumb-davy md:pr-1 lg:pr-2 md:mx-auto">
    {children}
  </div>
);

export default ScrollContainer;
