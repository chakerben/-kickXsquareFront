import { gsap } from "gsap"
import identity from "lodash/identity"
import times from "lodash/times"
import uniq from "lodash/uniq"
import React, { useEffect, useRef, useState } from "react"

import { Button, Flex } from "@chakra-ui/react"
const events = {
  start: ["mousedown", "touchstart"],
  end: ["mouseup", "touchend"],
}

const windowGlobal = typeof window !== "undefined" && window

const Caroussel = (props) => {
  const {
    children = [],
    style,
    slidesToShow = 4,
    slidesToScroll = 4,
    direction = "row",
    gap = 10,
    duration = 0.5,
    slideWidth,
    slideHeight,
    displayArrow = true,
    hideNullableArrow = false,
    nextArrow,
    prevArrow,
    displayDots = true,
    dot,
    justify = "center",
    title,
  } = props
  const width = slidesToShow * (slideWidth + gap) - gap
  const height =
    slidesToShow * (slideHeight + gap) - gap + (direction === "column" ? 3 : 0)
  const totalWidth = children?.length * (slideWidth + gap) - gap
  const totalHeight = children?.length * (slideHeight + gap) - gap
  const [activeSlide, setActiveSlide] = useState(0)
  const rendered = useRef(times(slidesToShow, identity))
  const [touchStart, setTouchStart] = useState()
  const [touchEnd, setTouchEnd] = useState()

  const wrapperRef = useRef()
  const portionRef = useRef()

  const onDotHandler = (slide) => {
    setActiveSlide(slide)
  }

  const onNextHandler = () => {
    if (slidesToShow < children.length) {
      const nextSlide = activeSlide + slidesToScroll
      if (nextSlide < children.length) {
        setActiveSlide(nextSlide)
      } else {
        setActiveSlide(0)
      }
    }
  }

  const onPrevHandler = () => {
    if (slidesToShow < children.length) {
      const nextSlide = activeSlide - slidesToScroll
      if (nextSlide >= 0) {
        setActiveSlide(nextSlide)
      } else {
        setActiveSlide(
          Math.floor(children.length / slidesToShow) * slidesToShow
        )
      }
    }
  }

  const isVisible = (index) => {
    const currentlyVisible =
      index >= activeSlide && index < activeSlide + slidesToShow
    if (currentlyVisible) {
      rendered.current = uniq([...rendered.current, index])
    }
    if (rendered.current.includes(index)) {
      return true
    }
    return false
  }

  useEffect(() => {
    const size = direction === "row" ? slideWidth : slideHeight
    const newOffset = -activeSlide * (size + gap) + 3
    const options = { duration }
    if (direction === "row") {
      options.x = `${newOffset}px`
    } else {
      options.y = `${newOffset}px`
    }
    gsap.to(portionRef.current, options)
  }, [activeSlide])

  useEffect(() => {
    const target = wrapperRef.current
    const moveStart = (e) => {
      if (windowGlobal) {
        events.end.forEach((eventEnd) =>
          windowGlobal.addEventListener(eventEnd, moveEnd, { once: true })
        )
      } else {
        events.end.forEach((eventEnd) =>
          target?.addEventListener(eventEnd, moveEnd, { once: true })
        )
      }

      setTouchStart(e.changedTouches ? e.changedTouches[0] : e)
    }

    const moveEnd = (e) => {
      setTouchEnd(e.changedTouches ? e.changedTouches[0] : e)
    }

    events.start.forEach((eventStart) =>
      target.addEventListener(eventStart, moveStart)
    )

    return () => {
      events.start.forEach((eventStart) =>
        target.addEventListener(eventStart, moveStart)
      )
    }
  }, [wrapperRef])

  useEffect(() => {
    if (touchStart && touchEnd) {
      const deltaX = touchEnd?.clientX - touchStart?.clientX
      const deltaY = touchEnd?.clientY - touchStart?.clientY
      if (
        (direction === "row" && deltaX < -50) ||
        (direction === "column" && deltaY < -50)
      ) {
        onNextHandler()
      }
      if (
        (direction === "row" && deltaX > 50) ||
        (direction === "column" && deltaY > 50)
      ) {
        onPrevHandler()
      }
    }
  }, [touchEnd])

  const RenderPrevArrow = ({ ...props }) => {
    if (!displayArrow || children.length <= slidesToShow) {
      return null
    }
    if (hideNullableArrow) {
      const nextSlide = activeSlide - slidesToScroll
      if (nextSlide < 0) {
        return null
      }
    }

    if (prevArrow) {
      return prevArrow({
        ...props,
        activeSlide: activeSlide,
        onClick: onPrevHandler,
      })
    }
    return <Button onClick={onPrevHandler}>Prev</Button>
  }

  const RenderNextArrow = ({ ...props }) => {
    if (!displayArrow || children.length <= slidesToShow) {
      return null
    }
    if (hideNullableArrow) {
      const nextSlide = activeSlide + slidesToScroll
      if (nextSlide >= children.length) {
        return null
      }
    }
    if (nextArrow) {
      return nextArrow({
        ...props,
        activeSlide: activeSlide,
        onClick: onNextHandler,
      })
    }
    return <Button onClick={onNextHandler}>Prev</Button>
  }

  const RenderDot = ({ slide, ...props }) => {
    if (!displayDots || children.length <= slidesToShow) {
      return null
    }
    if (dot) {
      return dot({
        ...props,
        active: slide === activeSlide,
        onClick: () => onDotHandler(slide),
      })
    }
    return (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "5px",
          backgroundColor: slide === activeSlide ? "blue" : "white",
        }}
        onClick={() => onDotHandler(slide)}
      />
    )
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ width: "100%", height: "100%", ...style }}
    >
      <Flex
        direction={direction}
        justify={justify}
        align="center"
        style={{ width: "100%", height: "100%", ...style }}
      >
        <RenderPrevArrow />
        <div
          ref={wrapperRef}
          style={{
            width: direction === "row" ? width : slideWidth,
            height: direction === "row" ? slideHeight : height,
            overflow: "hidden",
          }}
        >
          <h2 className="text-xl text-gray-900 uppercase py-3">{title}</h2>
          <ul
            ref={portionRef}
            style={{
              display: "flex",
              flexDirection: direction,
              justifyContent: "space-between",
              width: direction === "row" ? totalWidth : slideWidth,
            }}
          >
            {children.map((c, i) => (
              <li
                key={`slide_${i}`}
                style={{
                  width: slideWidth,
                  listStyleType: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isVisible(i) ? c : null}
              </li>
            ))}
          </ul>
        </div>
        <RenderNextArrow />
      </Flex>
      {direction === "row" && displayDots && (
        <Flex direction="row" style={{ marginTop: "30px" }} gridGap={2}>
          {times(
            children.length % slidesToShow === 0
              ? children.length / slidesToShow
              : Math.floor(children.length / slidesToShow) + 1,
            (i) => i * slidesToShow
          ).map((i) => (
            <RenderDot key={`carousel_dot_${i}`} slide={i} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default Caroussel
