import { useState } from "react";

export const useFormInput = () => {
    const [value, setValue] = useState("");

    return {
        value,
        setValue,
        clear: () => setValue(""),
    };
};
