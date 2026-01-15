import React, { useMemo } from 'react';
import './HexViewer.css';

const HexViewer = ({ data }) => {
    // Convert text data to hex representation
    const memoryDump = useMemo(() => {
        // Flatten array of strings if needed
        const text = Array.isArray(data) ? data.join('\n\n') : data;
        const bytes = new TextEncoder().encode(text);
        const lines = [];
        const bytesPerLine = 16;

        for (let i = 0; i < bytes.length; i += bytesPerLine) {
            const slice = bytes.slice(i, i + bytesPerLine);

            // Address offset (e.g., 00000010)
            const offset = i.toString(16).padStart(8, '0');

            // Hex representation
            const hex = Array.from(slice)
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ');

            // Padding if last line is short
            const hexPadding = '   '.repeat(bytesPerLine - slice.length);

            // ASCII representation
            const ascii = Array.from(slice)
                .map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.')
                .join('');

            lines.push({ offset, hex: hex + hexPadding, ascii });
        }

        return lines;
    }, [data]);

    return (
        <div className="hex-viewer">
            <div className="hex-header">
                <span className="hex-col-offset">Offset</span>
                <span className="hex-col-bytes">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</span>
                <span className="hex-col-ascii">Decoded Text</span>
            </div>
            <div className="hex-body">
                {memoryDump.map((line, idx) => (
                    <div key={idx} className="hex-row">
                        <span className="hex-offset">{line.offset}</span>
                        <span className="hex-bytes">{line.hex}</span>
                        <span className="hex-ascii">{line.ascii}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HexViewer;
