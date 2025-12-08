import { Skeleton } from '@/components/ui/skeleton';

// Skeleton Loading Component
export default function BlogCardSkeleton() {
  return (
    <div>
      {/* Image Skeleton */}
      <Skeleton className="aspect-video w-full" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex flex-col space-y-3">
        {/* Meta Info Skeleton */}
        <Skeleton className="h-4 w-24" />
        
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Author & Read More Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}