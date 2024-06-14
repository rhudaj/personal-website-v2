async function getVSCOimageURLs() {
    const SITE_ID = 77011370; // user profile
    const LIMIT = 50;
    const base_url = 'https://vsco.co/api/3.0/medias/profile';
    const query = `site_id=${SITE_ID}&limit=${LIMIT}`;
    const url = `${base_url}?${query}`;
    // ---------------------------
    const image_urls: string[] = [];
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              'Accept-Encoding': 'gzip, deflate, br, zstd',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'max-age=0',
              'Cookie': 'vs_app_id=82a20e83-b849-48ac-b1a1-2052170c407a; vs_anonymous_id=49a03e5a-2493-441f-9dc6-56a99037db0f; _fbp=fb.1.1718302976591.49321309141554989; master_ga=GA1.1.987464627.1718302977; studio_ga=GA1.2.987464627.1718302977; marketing_ga=GA1.2.987464627.1718302977; afUserId=0f8a785c-71fc-43f8-8017-6550cc1c9c87-p; AF_SYNC=1718306409399; vs=5e3d3937720f4088b56ed03bc7e1d3e8; ab.storage.userId.1305a6b0-8e68-4ad3-b408-133890aecba5=%7B%22g%22%3A%2283282764%22%2C%22c%22%3A1718307017308%2C%22l%22%3A1718307017309%7D; ab.storage.deviceId.1305a6b0-8e68-4ad3-b408-133890aecba5=%7B%22g%22%3A%221dca8873-e177-bd55-390e-c58b032501b6%22%2C%22c%22%3A1718307017310%2C%22l%22%3A1718307017310%7D; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jun+13+2024+16%3A39%3A37+GMT-0400+(Eastern+Daylight+Time)&version=202308.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false; ab.storage.sessionId.1305a6b0-8e68-4ad3-b408-133890aecba5=%7B%22g%22%3A%22ddedcbd6-4c89-bd60-724b-63c6560b68d1%22%2C%22e%22%3A1718312978757%2C%22c%22%3A1718307017309%2C%22l%22%3A1718311178757%7D; __Host-vs_csrf_token=02ddf49abef79202ee728615ea533ba6db9f299a6fa7b60f73fc332f6b63edff; aws-waf-token=033a70fa-e900-4a57-8114-946fe404cd15:FAoAbDaULlYaAAAA:uXM6ihVASqhIij35xoYhSvhIp0TAqndzBM6nTxwk469IaCri7WSnG90IPDk2YKo/m1Pa+rvnuU89W6jEUJlZTei4asohWoBBhCE3ORuKhAwquKNZHszrMgBS07m1jbbs8VnZEbp8JdOEtKFUhepK27hcKftxbf5+JuZM10WqRZykNECM6R1sq2QQL1wFYWltMZVfhy9kZ4+cRjKMcCg9+AvA2lFUAJDHOSk6mQSWDuyCGfhagC1oPSRCcXdCrA==; studio_ga_RWXQ2YKT1C=GS1.2.1718313017.3.0.1718313017.0.0.0; marketing_ga_5FD0CQ5NGL=GS1.2.1718313017.3.0.1718313017.0.0.0; master_ga_HBWFLVCQVC=GS1.1.1718313017.3.0.1718313017.60.0.0',
              'If-Modified-Since': 'Fri, 14 Jun 2024 14:37:06 GMT',
              'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
              'Sec-Ch-Ua-Mobile': '?0',
              'Sec-Ch-Ua-Platform': '"macOS"',
              'Sec-Fetch-Dest': 'empty',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'cross-site',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            },
            credentials: 'include', // Ensure cookies are sent with the request
          });

        if(!response.ok) throw Error('Response not okay!')

        const jsonData: any = await response.json();
        const media = jsonData.media as any[];

        media.forEach(image_info => {
            image_urls.push( `http:${image_info.image.responsive_url}` );
        });
        console.log(image_urls.length, ' Total Extracted Image URLs:', image_urls);
        // Now you can use these image URLs to display images on your own website
    } catch (error) {
        console.error('Error fetching and extracting images:', error);
    }
    return image_urls;
};

export { getVSCOimageURLs }