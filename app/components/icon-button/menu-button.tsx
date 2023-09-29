import { useState, type PropsWithChildren } from "react";
import { IconButton } from ".";

interface MenuButton extends PropsWithChildren {
  enabled: Boolean;

  items: { [key: string]: () => void };
}

interface DropDownItemsListProps extends Pick<MenuButton, "items"> {
  onCloseRequest: () => void;
}

function DropDownItemsList(props: DropDownItemsListProps) {
  return (
    <>
      <div
        autoFocus
        onFocus={() => {
          console.log("focus na lista");
        }}
        className="dropdown-content"
      >
        {Object.entries(props.items).map(([label, onClick]) => (
          <div
            key={label}
            className="dropdown-item"
            onClick={() => {
              props.onCloseRequest();
              onClick();
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
}

export default function MenuButton(props: MenuButton) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="dropdown" onBlur={() => {}}>
      <IconButton enabled={props.enabled} onPressed={() => setOpened(!opened)}>
        {props.children}
      </IconButton>
      {opened && (
        <DropDownItemsList
          items={props.items}
          onCloseRequest={() => {
            if (opened) setOpened(false);
          }}
        />
      )}
    </div>
  );
}
