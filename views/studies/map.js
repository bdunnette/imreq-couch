function(doc) {
  if (doc.accessionNo) {
      emit(doc.accessionNo, doc);
  }
};