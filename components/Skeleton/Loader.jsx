import {
	ArchiveSkeleton,
	FormSkeleton,
	ProfileSkeleton,
	TableSkeleton,
} from '@/components/Skeleton'

export const Skeleton = {
	table: <TableSkeleton />,
	archive: <ArchiveSkeleton />,
	profile: <ProfileSkeleton />,
	form: <FormSkeleton />,
}

const Loader = ({ loader = 'table' }) => Skeleton[loader]

export { Loader }
