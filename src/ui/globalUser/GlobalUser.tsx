import { ReactNode, useState } from "react";
import { GlobalUserContext } from "./GlobalUserContext";
import { User } from "@supabase/supabase-js";

const GlobalUser = ({ children }: { children: ReactNode }) => {
    const [user, setAppUser] = useState<User | null>(null);

    const setUser = (user: User | null) => setAppUser(user);

    return (
        <GlobalUserContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalUserContext.Provider>
    );
};

export default GlobalUser;
