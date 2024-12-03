import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

export const getIconByName = (name: string): IconDefinition | IconProp => {
  const icon =
    SolidIcons[
      `fa${name.charAt(0).toUpperCase()}${name.slice(
        1
      )}` as keyof typeof SolidIcons
    ];

  return icon || SolidIcons.faQuestion;
};
