import { AccessBTN } from "./styles";

type Props = {
  path: string;
  children: string;
};

export function AccessButton({ path, children }: Props) {
  return (
    <>
      <AccessBTN to={path}>{children}</AccessBTN>
    </>
  );
}
