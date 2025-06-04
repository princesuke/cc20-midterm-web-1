import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type MoviePaginationProps = {
  page: number;
  totalPage: number;
  hdlChangePage: (page: number) => void;
};

export default function MoviePagination({ page, hdlChangePage }: MoviePaginationProps) {
  const lastPage = 500;
  return (
    <div className="text-white">
      <Pagination>
        <PaginationContent>
          <PaginationItem className="hover:cursor-pointer hover:border-b-2">
            <PaginationLink onClick={() => page == 1 || hdlChangePage(1)}>First</PaginationLink>
          </PaginationItem>
          {page == 1 || (
            <PaginationItem className="hover:cursor-pointer hover:border-b-2">
              <PaginationPrevious onClick={() => hdlChangePage(page - 1)} />
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem className="hover:cursor-pointer hover:border-b-2">
              <PaginationLink onClick={() => hdlChangePage(page - 1)}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          {page < lastPage && (
            <PaginationItem className="hover:cursor-pointer hover:border-b-2">
              <PaginationLink onClick={() => hdlChangePage(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}
          {page == lastPage || (
            <PaginationItem className="hover:cursor-pointer hover:border-b-2">
              <PaginationNext onClick={() => hdlChangePage(page + 1)} />
            </PaginationItem>
          )}
          <PaginationItem className="hover:cursor-pointer hover:border-b-2">
            <PaginationLink onClick={() => page == lastPage || hdlChangePage(lastPage)}>
              Last
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
