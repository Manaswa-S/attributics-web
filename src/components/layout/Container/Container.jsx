const Container = ({
    children,
    className = '',
    size = 'default',
    noPadding = false,
    ...props
}) => {
    const sizeClasses = {
        sm: 'max-w-3xl',
        default: 'max-w-7xl',
        lg: 'max-w-[1400px]',
        full: 'max-w-full',
    };

    // Check if className already has padding classes
    const hasCustomPadding = className.includes('px-');
    const defaultPadding = !noPadding && !hasCustomPadding ? 'px-4 sm:px-6 lg:px-8' : '';

    return (
        <div
            className={`
        w-full mx-auto
        ${defaultPadding}
        ${sizeClasses[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
