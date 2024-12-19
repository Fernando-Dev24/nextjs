import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({ title, ...props }: Props) => {
  return (
    <div className={`mt-3 ${props?.className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-10`}
      >
        {title}
      </h1>

      {props?.subTitle && <h3 className="text-xl mb-5">{props.subTitle}</h3>}
    </div>
  );
};
