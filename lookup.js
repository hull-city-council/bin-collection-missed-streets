function createDataRetriever() {
  return {
      isLoading: false,
      isData: false,
      isError: false,
      missedStreets: [],
      getData() {
          this.isLoading = true;
          fetch('https://raw.githubusercontent.com/hull-city-council/bin-collection-missed-streets/main/missed-streets.json')
              .then((response) => {
                    if (response.ok) {
                    return response.json();
                    }
              })
              .then((data) => {
                    if (data[0].Events < 1) {
                      this.isLoading = false;
                      return;
                    }
                  this.missedStreets = data[0].streets;
                  this.isData = true;
                  this.isLoading = false;
              })
              .catch((error) => {
                this.isError = true;
                this.isLoading = false;
                this.isData = true;
                console.log(error);
              });
      }
  }
}
