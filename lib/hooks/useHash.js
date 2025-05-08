'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const getHash = () =>
	typeof window !== 'undefined' ? window.location.hash : ''

export const useHash = () => {
	const [isClient, setIsClient] = useState(false)
	const [hash, setHash] = useState(getHash())
	const params = useParams()

	useEffect(() => {
		setIsClient(true)
		setHash(getHash())
	}, [params])

	return isClient ? hash : ''
}
