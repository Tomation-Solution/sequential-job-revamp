import axios from "axios";


export async function getCountries() {
    const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");

    if (response && response.data) {
        return response.data.map((res: any) => res?.name?.common).filter((n: string) => n).sort();
    }

    return [];
}
