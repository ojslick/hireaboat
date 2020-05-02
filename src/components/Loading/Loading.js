import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const Loading = () => (
  <div>
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>

    <Image src="/images/wireframe/short-paragraph.png" />
  </div>
);

export default Loading;
