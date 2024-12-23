import { cn } from "../../../core/utils/cn";
import { Button } from "../Buttons/Button";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto bg-inherit dark:bg-inherit",
        className
      )}
    >
      {children}
    </div>
  );
};
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[1rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
function timeAgo(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date)) return "Invalid date";

  const diff = new Date() - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  if (hours <= 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  image,
  url,
  isFeatured,
  source,
  publishedAt,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-bg_grid dark:border-dark_border_grid bg-white border border-light_border_grid h-full",
        isFeatured ? "md:col-span-2 relative hidden md:block" : "",
        className
      )}
    >
      {header}
      <div
        className={cn(
          "group-hover/bento:translate-x-2 transition duration-200 flex flex-col h-full",
          isFeatured ? "relative" : ""
        )}
      >
        <div className={`${isFeatured?" h-full":"h-40"} relative w-full`}>
          {image ? (
            <img
              src={image}
              alt={title}
              className={cn(
                "rounded-lg object-cover w-full h-full",
                isFeatured ? "inset-0" : ""
              )}
            />
          ) : (
            <Skeleton className="w-full h-full rounded-lg" />
          )}
            
        </div>
        {isFeatured && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-between p-4 z-10 hidden lg:flex">
            <div className="font-sans font-bold text-white text-lg truncate-description">
              {title}
            </div>
            <div className="flex justify-end">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-white text-black px-4 py-2 rounded-md"
                  text={"Read more"}
                />
              </a>
            </div>
          </div>
        )}
         {!isFeatured && (
          <div className="flex flex-col flex-1 min-h-0 justify-between">
            <div
              className={`font-sans font-bold text-neutral-600 dark:text-neutral-200  sm:mt-0 sm:mx-0 [@media(max-width:500px)]:mt-[10px] [@media(max-width:500px)]:mx-[0px] ${
                description ? "truncate-description" : ""
              }`}
            >
              {title}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 truncate-description  sm:mt-0 sm:mx-0 [@media(max-width:500px)]:mt-[10px] [@media(max-width:500px)]:mx-[0px]">
              {description}
            </div>
            <div className="flex justify-between mt-2">
              <div className="font-sans lowercase font-normal text-neutral-600 text-xs dark:text-neutral-300 truncate-description">
                source: {source}
              </div>
              <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300  truncate-description">
                {timeAgo(publishedAt)}
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:mt-2"
            >
              <Button text={"Read more"} />
            </a>
          </div>        )}
      </div>
    </div>
  );
};

