/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
    it('should exists the search method', () => {
      expect(search).to.exist;
    });

    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the currect URL', () => {
      context('passing one type', () => {
        const artists = search('Marshmello', 'artist');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Marshmello&type=artist'
        );

        const albums = search('Marshmello', 'album');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Marshmello&type=album'
        );
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Marshmello', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Marshmello&type=artist,album'
        );
      });
    });
  });
});
