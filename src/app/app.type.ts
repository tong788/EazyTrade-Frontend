export interface CommentDto {
  id: number;
  detail: string | null;
  commodityId: number;
  createAt: string;
}

export interface Commodity {
  id: number;
  name: string;
  publishDate: string;
  price: number | null;
  code: string;
  comments: CommentDto[];
}

export type CommodityDto = Commodity;