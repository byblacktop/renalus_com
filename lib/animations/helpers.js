import { GS } from '@/lib/animations'

//// Validations
//
export const isDom = el => el && typeof el.nodeName === 'string'

export const isImg = el =>
	isDom(el) && el.nodeName === 'FIGURE' && el.querySelector('img')

export const isBody = el => el && !!el.closest('.__body')

export const notBody = el => !isBody(el)

const filters = {
	dom: isDom,
	img: isImg,
	body: isBody,
	notBody: notBody,
}

export const cleanTriggers = (els, filter) => {
	if (!els) return { valid: false }

	const fn = filters[filter] ?? isDom

	if (Array.isArray(els)) {
		if (els.length < 1) return { valid: false }

		const triggers = els.flat().filter(Boolean).filter(fn)

		if (triggers.length < 1) return { valid: false }

		return { valid: true, triggers }
	}

	return fn(els) ? { valid: true, els } : { valid: false }
}

export const isFirstElementChild = ({ current }) =>
	curent && current?.parentElement?.firstElementChild === current

//// Tween Helpers
//
export const revertOnComplete = tween => tween.revert()

export const revertCallback = tween =>
	tween.eventCallback('onComplete', revertOnComplete, [tween])
