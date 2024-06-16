import type { ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TMenuItem, DropdownNavProps } from "@/utils/types";

function DropdownNav({ item }: DropdownNavProps): ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex items-center text-foreground/60 transition-colors hover:text-foreground/80">
          {item.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {item.menu?.map((menuItem: TMenuItem) => (
          <a href={menuItem.url} key={menuItem.name}>
            <DropdownMenuItem>{menuItem.name}</DropdownMenuItem>
          </a>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownNav;
