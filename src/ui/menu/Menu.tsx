import { ReactNode, useState } from "react";
import styled from "styled-components";
import { MenuContext, MenuPosition, useMenuContext } from "./MenuContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

// interface StyledListPosition {
//     $position: { x: number; y: number };
// }

const StyledList = styled.ul<MenuPosition>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props?.$position.x}px;
    top: ${(props) => props?.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

export default function Menu({
    id,
    children,
}: {
    id: number;
    children: ReactNode;
}) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [position, setPosition] = useState<MenuPosition>();

    const closeMenu = () => setOpenId(null);
    const openMenu = () => setOpenId(id);

    return (
        <MenuContext.Provider
            value={{
                openId,
                openMenu,
                closeMenu,
                setPosition,
                position,
            }}
        >
            <StyledMenu>{children}</StyledMenu>
        </MenuContext.Provider>
    );
}

Menu.Button = function MenuButton({ children }: { children: ReactNode }) {
    return <StyledButton>{children}</StyledButton>;
};

Menu.Body = function MenuBody({ children }: { children: ReactNode }) {
    const { closeMenu } = useMenuContext();
    const { ref } = useClickOutside(closeMenu!);
    //
    return <div ref={ref}>{children}</div>;
};

Menu.Toggle = function MenuToggle({ children }: { children: ReactNode }) {
    const { openId, openMenu, closeMenu, setPosition } = useMenuContext();
    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(openId);
        if (!openId) {
            console.log("first");
            const rect = e.currentTarget.getBoundingClientRect();
            setPosition?.({ $position: { x: rect.right, y: rect.bottom } });
            openMenu?.();
        } else {
            closeMenu?.();
        }
    };

    return <StyledToggle onClick={handleToggle}>{children}</StyledToggle>;
};

Menu.List = function MenuList({ children }: { children: ReactNode }) {
    const { openId, position } = useMenuContext();
    if (!position) return null;
    const output = openId ? (
        <StyledList $position={position.$position}>{children}</StyledList>
    ) : null;
    return createPortal(output, document.body);
    // return <StyledList>{children}</StyledList>;
};

Menu.Buttons = function MenuButtons({
    data,
    render,
}: {
    data: ReactNode[];
    render: (button: ReactNode) => ReactNode;
}) {
    return data.map(render);
};
