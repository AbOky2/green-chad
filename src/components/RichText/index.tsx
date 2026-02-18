
import React from 'react'

import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RichText: React.FC<{ content: any; className?: string }> = ({ content, className }) => {
    if (!content) {
        return null
    }

    return (
        <div className={className}>
            <LexicalRichText data={content} />
        </div>
    )
}
