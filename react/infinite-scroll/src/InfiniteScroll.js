import React from "react";

export default class InfiniteScroll extends React.Component {
  state = {
    error: false,
    hasMore: true,
    isLoading: false,
    items: [],
  }  

  componentWillMount() {
    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        onLoadItems,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Abort early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) {
        return;
      }

      // Checks that the page has scrolled to the bottom
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        onLoadItems();
      }
    };

    // Loads some items on initial load
    this.onLoadItems();
  }

  componentWillUnmount() {
    window.onscroll = undefined;
  }

  onLoadItems = () => {
    this.setState(
      { isLoading: true }, 
      async () => {
        try {
          const nextItems = await this.props.onLoadItems();
          // Merges the next items into our existing items
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.items.length < 30),
            isLoading: false,
            items: [
              ...this.state.items,
              ...nextItems,
            ],
          });
        } catch (err) {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        }
      }
    );
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      items,
    } = this.state;

    return (
      <div>
        { items.map(this.props.renderItem) }
        { error && (typeof this.props.error==='function') && this.props.error(error) }
        { isLoading && this.props.loading }
        { !hasMore && this.props.endOfList }
      </div>
    );
  }
}
