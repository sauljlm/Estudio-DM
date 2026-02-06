export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    ariaLabel,
    className = "",
    disabled = false,
    ...props
  }) {

    const variants = {
        primary: `
          bg-black text-white
          [--liquid-button-color:#FF6434]
          hover:text-white
        `,
        secondary: `
          bg-white text-[#000] border border-#FF6434
          [--liquid-button-color:#FF6434]
          hover:text-white
        `,
    };
    // FD802C
    
    return (
    <button
        type="button"
        className={`
            relative inline-flex items-center justify-center gap-2
            whitespace-nowrap text-sm cursor-pointer  b  overflow-hidden
            rounded-md font-medium
            px-7 py-2 h-10
            transition-colors
 
            bg-no-repeat
            [background-image:_linear-gradient(var(--liquid-button-color)_0_0)]
            [background-size:200%_var(--liquid-button-fill,0.2em)]
            [background-position:calc(200%-var(--liquid-button-fill,0%))_100%]

            hover:[--liquid-button-fill:100%]
            hover:[--liquid-button-delay:0.3s]
            [transition:_background_0.3s_var(--liquid-button-delay,0s),_color_0.3s_var(--liquid-button-delay,0s),_background-position_0.3s_calc(0.3s_-_var(--liquid-button-delay,0s))]
            ${variants[variant]}
            ${className}
        `}
        {...props}
    >
        {children}
    </button>
    );
}
  