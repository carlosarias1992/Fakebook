import React from 'react';
import HeaderContainer from '../feed/header/header_container';
import CoverContainer from './cover/cover_container';

export default props => {
    return (
        <main>
            <header className="flex-center">
                <HeaderContainer />
            </header>
            <section>
                <CoverContainer />
            </section>
        </main>
    )
}