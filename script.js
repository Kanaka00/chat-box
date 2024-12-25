const apiUrl = "https://api.unsplash.com/search/photos";
const imgSrc = document.querySelector('.image');
const userInput = document.querySelector("#userInput")

async function searchImage() {

        const query = userInput.value.trim();
        if(!query) {
            alert("Please enter a search term");
            return;
        }

    try {
        const response = await fetch(`${apiUrl}?query=${query}`,{
            method: 'GET',
            headers: {
                'Authorization': `Client-ID szT0vezQZajRULIADrPRliGidU5Rh6fJCdz32dfRGgU`,  // Correct way to pass Access Key
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const firstImageUrl = data.results[0]?.urls?.regular;
        if (data.results && firstImageUrl.length > 0){

            imgSrc.src = firstImageUrl;
            imgSrc.alt = data.results[0]?.alt_description;
            console.log("firstImageUrl: " + firstImageUrl);
        }
        else {
            alert("No images found matching your search term");
            imgSrc.src = '';
            imgSrc.alt = 'no images found matching your search term';
        }

        console.log("API data is:", data);  // Logs the API response
    } catch (error) {
        console.error("API call failed:", error);
    }
}

searchImage();
