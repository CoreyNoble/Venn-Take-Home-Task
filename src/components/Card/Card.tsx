import React from 'react';
import type { ReactNode } from "react";
import './Card.scss';

function Card({ children }: { children: ReactNode }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

export default Card
