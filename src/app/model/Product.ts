/**
 * Only to this job opotunity test - i will create only on DTO with model together to gain some time
 */
export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  categoryId: number;
  categoryName: string;
  categoryPath: string;
}
