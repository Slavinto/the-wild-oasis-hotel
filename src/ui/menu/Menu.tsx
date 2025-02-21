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

const StyledList = styled.ul<MenuPosition>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props?.$position.x}px;
    top: ${(props) => props?.$position.y}px;
    z-index: 900;
`;

// const ItemList = forwardRef<
//     HTMLUListElement,
//     React.ComponentPropsWithoutRef<"ul"> & MenuPosition
// >(({ children, $position, ...props }, ref) => {
//     return (
//         <StyledList ref={ref} $position={$position} {...props}>
//             {children}
//         </StyledList>
//     );
// });

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

    // useEffect(() => {
    //     console.log({ openId });
    // }, [openId]);

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

Menu.Toggle = function MenuToggle({ children }: { children: ReactNode }) {
    const { openId, openMenu, closeMenu, setPosition } = useMenuContext();

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!openId) {
            const rect = e.currentTarget.getBoundingClientRect();

            const position = {
                $position: {
                    x: window.innerWidth - rect.left - rect.width,
                    y: rect.bottom + 8,
                },
            };
            setPosition?.(position);
            openMenu?.();
        } else {
            closeMenu?.();
        }
    };

    return <StyledToggle onClick={handleToggle}>{children}</StyledToggle>;
};

Menu.List = function MenuList({ children }: { children: ReactNode }) {
    const { openId, position, closeMenu } = useMenuContext();

    // if false is being passed as second arg closeMenu or other handler will run at bubbling phase
    const { ref } = useClickOutside(closeMenu!, true, ".modal-content");

    if (!position || !ref) return null;

    const output = openId ? (
        // <ItemList
        //     ref={ref as React.LegacyRef<HTMLUListElement>}
        //     $position={position.$position}
        // >
        //     {children}
        // </ItemList>
        <StyledList
            ref={ref as React.MutableRefObject<HTMLUListElement>}
            $position={position.$position}
        >
            {children}
        </StyledList>
    ) : null;
    return createPortal(output, document.body);
};

Menu.Button = function MenuButton({
    onClick,
    disabled,
    children,
}: {
    onClick?: (e: React.MouseEvent) => void;
    disabled: boolean;
    children: ReactNode;
}) {
    // const buttonRef = useRef<HTMLButtonElement | null>(null);
    // const { closeMenu } = useMenuContext();

    const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("button handler running");
        // closeMenu?.();
        // attached onClick handler in Modal.Open -> opens the corresponding modal Window
        onClick?.(e);
    };

    return (
        <StyledButton onClick={handler} disabled={disabled}>
            {children}
        </StyledButton>
    );
};
