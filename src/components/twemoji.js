import React, { memo } from 'react'
import twemoji from 'twemoji'

// Using the official https://github.com/twitter/twemoji from Twitter
// With an excellent example from https://gist.github.com/chibicode/fe195d792270910226c928b69a468206

const Twemoji = ({ emoji }) => (
    <span
        dangerouslySetInnerHTML={{
            __html: twemoji.parse(emoji, {
                folder: 'svg',
                ext: '.svg'
            })
        }}
    />
)

export default memo(Twemoji)