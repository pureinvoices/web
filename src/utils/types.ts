export interface TMenuItem {
  name: string;
  url: string;
}

export interface TNavItem {
  name: string;
  url?: string | null;
  isDropdown?: boolean;
  menu?: TMenuItem[];
}

export interface TNavbarLink extends TNavItem {}

export interface DropdownNavProps {
  item: TNavItem;
}
