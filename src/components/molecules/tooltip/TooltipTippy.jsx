import React, { useRef, useEffect } from "react";
import tippy from "tippy.js";
import "./tooltip-styles.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/dist/tippy.css";

export const TooltipTippy = ({ children, content, placement = "top", offset = [0, 10], theme = "custom-tooltip" }) => {
    const tooltipRef = useRef();

    useEffect(() => {
        if (tooltipRef.current) {
            tippy(tooltipRef.current, {
                content: content,
                placement: placement,
                offset, 
                theme, 
            });
        }
    }, [content, placement]);

    return <div className="text-sm" ref={tooltipRef}>{children}</div>;
};
