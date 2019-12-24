import React, { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";

const AddressLookupDebouncedInput = React.forwardRef(
  ({ value, onChange, wasSelected, ...rest }, ref) => {
    const [event, setEvent] = useState({ target: { value: "" } });
    const [debouncedEvent] = useDebounce(event, 300);

    useEffect(() => {
      onChange(debouncedEvent);
    }, [onChange, debouncedEvent]);

    /**
     * HACK - We weren't able to set the value when the input was selected.
     * By passing the props for the AutocompleteField, we can manually track that state, and reset it as we need.
     * In this case, when an address is selected, we want to update this input accordingly.
     * Otherwise, we will use the state in this component to manage the value if you the input.
     */
    useEffect(() => {
      if (wasSelected) {
        setEvent({ target: { value } });
      }
    }, [wasSelected, value]);

    return (
      <input
        ref={ref}
        onChange={changeEvent => {
          changeEvent.persist();
          setEvent(changeEvent);
        }}
        {...rest}
        value={event.target.value}
      />
    );
  }
);

export default AddressLookupDebouncedInput;
