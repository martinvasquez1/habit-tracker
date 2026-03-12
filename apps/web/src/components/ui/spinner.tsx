import { LuLoaderCircle } from "react-icons/lu";
import IconWrapper from "../icon-wrapper";

export default function Spinner() {
  return (
    <div className="flex justify-center py-20 md:py-14">
      <IconWrapper
        icon={<LuLoaderCircle className="animate-spin text-primary" />}
        size="md"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
