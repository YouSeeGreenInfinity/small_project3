// export interface LikeState {
//     likedProductIds: number[];
//     likesCount: { [productId: number]: number };
//     loading: boolean;
//   }
  
//   export interface ToggleLikeResponse {
//     liked: boolean;
//   }

// types/likeTypes.ts
export interface ToggleLikeResponse {
    liked: boolean;
    newLikeCount: number;
  }
  
  export interface LikesCountResponse {
    productId: number;
    count: number;
  }
  
  export interface UserLikesResponse {
    likedProductIds: number[];
  }
  
  export interface BatchLikesRequest {
    productIds: number[];
  }
  
  export interface LikeState {
    likedProductIds: number[];
    likesCount: { [productId: number]: number };
    loading: boolean;
    error: string | null;
  }