import Event from '../../models/event.js';
export const allEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate('organizer');
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error in allEvents API:', error);

    return res.status(500).json({ error: 'Server error' });
  }
};
export const eventBySlug = async (req, res) => {
  const { slug } = req.params;
  if (!slug) res.status(404).json({ message: 'Provide event slug.' });

  try {
    const event = await Event.findOne({ slug }).populate(
      'organizer',
      'logo name _id'
    );

    return res.status(200).json({ event });
  } catch (error) {
    console.error('Error in eventById API:', error);

    return res.status(500).json({ error: 'Server error' });
  }
};
export const searchEvent = async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    venue,
    location,
    eventType,
    tags,
    search,
  } = req.query;
  const query = {};

  try {
    if (title) {
      query.title = { $regex: new RegExp(title, 'i') };
    }
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (venue) {
      query.venue = { $regex: new RegExp(venue, 'i') };
    }
    if (eventType) {
      query.eventType = { $regex: new RegExp(eventType, 'i') };
    }
    if (tags) {
      tags = Array.isArray(tags) ? tags : tags.split(',');
      const tagRegexArray = tags.map((tag) => new RegExp(tag.toString(), 'i'));
      query.tags = { $in: tagRegexArray };
    }
    if (location) {
      query.location = {
        $or: [
          { city: { $regex: new RegExp(location, 'i') } },
          { state: { $regex: new RegExp(location, 'i') } },
          { country: { $regex: new RegExp(location, 'i') } },
        ],
      };
    }

    const events = await Event.find(query).exec();

    res.status(200).json({ events });
  } catch (error) {
    console.error('Error in event search API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
