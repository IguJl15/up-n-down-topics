import { type PropsWithChildren } from "react";

interface ToggleButtonProps extends IconButtonProps {
  selected: Boolean;
  enabled: Boolean;
  onPressed: () => void;
}

export function ToggleIconButton(props: ToggleButtonProps) {
  const iconProps: ButtonProps = {
    ...props,
    additionalClassName: "toggle",
  };

  return <Button {...iconProps} />;
}

export interface IconButtonProps extends PropsWithChildren {
  enabled: Boolean;
  onPressed: () => void;
}

export function IconButton(props: IconButtonProps) {
  const iconProps: ButtonProps = {
    ...props,
    selected: false,
  };

  return <Button {...iconProps} />;
}

interface ButtonProps extends PropsWithChildren {
  additionalClassName?: "toggle";

  selected: Boolean;
  enabled: Boolean;

  onPressed: () => void;
}

function Button(props: ButtonProps) {
  const className = props.additionalClassName
    ? props.additionalClassName + (props.selected ? " selected" : "")
    : "";

  return (
    <button
      id="icon-button"
      className={className}
      type="button"
      disabled={!props.enabled}
      onClick={props.onPressed}
    >
      {props.children}
    </button>
  );
}
