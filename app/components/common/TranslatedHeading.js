"use client";

import { useTranslation } from "@/hooks/useTranslation";

const TranslatedHeading = ({
  messageKey,
  as: Component = "h2",
  className,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <Component className={className} {...rest}>
      {t(messageKey)}
    </Component>
  );
};

export default TranslatedHeading;
