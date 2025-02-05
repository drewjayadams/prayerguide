// Global variable to track the current rosary type (traditional, lutheran, modified, ecumenical)
let currentRosaryType = "";

/* 
  Variation-specific data for each rosary type.
  The keys for Traditional, Lutheran, and Modified follow the correct day mapping:
    - Monday and Saturday → Joyful Mysteries
    - Tuesday and Friday → Sorrowful Mysteries
    - Wednesday and Sunday → Glorious Mysteries
    - Thursday → Luminous Mysteries
  
  For ecumenical, we include data for Monday–Saturday here;
  if ecumenical and Sunday are selected, the ecumenicalSundayData will be used.
*/
const rosaryData = {
  traditional: {
    // Joyful Mysteries on Monday
    Monday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Sorrowful Mysteries on Tuesday
    Tuesday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Glorious Mysteries on Wednesday
    Wednesday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Luminous Mysteries on Thursday
    Thursday: {
      title: "Luminous Mysteries",
      mysteries: [
        "Mystery 1: The Baptism of Jesus<br><i>Matthew 3:16-17",
        "Mystery 2: The Wedding at Cana<br><i>John 2:1-5",
        "Mystery 3: The Proclamation of the Kingdom<br><i>Mark 1:15",
        "Mystery 4: The Transfiguration<br><i>Matthew 17:1-2",
        "Mystery 5: The Institution of the Eucharist<br><i>Matthew 26:26"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Sorrowful Mysteries on Friday (same as Tuesday)
    Friday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Joyful Mysteries on Saturday (same as Monday)
    Saturday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    },
    // Glorious Mysteries on Sunday (same as Wednesday)
    Sunday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one  Our Father, three Hail Marys and the Glory Be (on the chain). For each decade, recite one Our Father, ten Hail Marys, and one Glory Be (on the chain). Conclude on the medallion with the Hail Holy Queen and finish with the Sign of the Cross.</p>"
    }
  },
  lutheran: {
    Monday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Tuesday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Wednesday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Thursday: {
      title: "Luminous Mysteries",
      mysteries: [
        "Mystery 1: The Baptism of Jesus<br><i>Matthew 3:16-17",
        "Mystery 2: The Wedding at Cana<br><i>John 2:1-5",
        "Mystery 3: The Proclamation of the Kingdom<br><i>Mark 1:15",
        "Mystery 4: The Transfiguration<br><i>Matthew 17:1-2",
        "Mystery 5: The Institution of the Eucharist<br><i>Matthew 26:26"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Friday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Saturday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    },
    Sunday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Apostles’ Creed (on the crucifix), then say one Our Father, followed by three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). Conclude on the medallion with either a Prayer from the Heart or a Pre-Trent Hail Mary.</p>"
    }
  },
  modified: {
    Monday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Tuesday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Wednesday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Thursday: {
      title: "Luminous Mysteries",
      mysteries: [
        "Mystery 1: The Baptism of Jesus<br><i>Matthew 3:16-17",
        "Mystery 2: The Wedding at Cana<br><i>John 2:1-5",
        "Mystery 3: The Proclamation of the Kingdom<br><i>Mark 1:15",
        "Mystery 4: The Transfiguration<br><i>Matthew 17:1-2",
        "Mystery 5: The Institution of the Eucharist<br><i>Matthew 26:26"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Friday: {
      title: "Sorrowful Mysteries",
      mysteries: [
        "Mystery 1: The Agony in the Garden<br><i>Matthew 26:36-39",
        "Mystery 2: The Scourging at the Pillar<br><i>Matthew 27:26",
        "Mystery 3: The Crowning with Thorns<br><i>Matthew 27:27-29",
        "Mystery 4: The Carrying of the Cross<br><i>Mark 15:21-22",
        "Mystery 5: The Crucifixion<br><i>Luke 25:33-46"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Saturday: {
      title: "Joyful Mysteries",
      mysteries: [
        "Mystery 1: The Annunciation<br><i>Luke 1:26-27",
        "Mystery 2: The Visitation<br><i>Luke 1:34-42",
        "Mystery 3: The Nativity<br><i>Like 2:1-7",
        "Mystery 4: The Presentation at the Temple<br><i>Luke 2:21-24",
        "Mystery 5: Finding Jesus in the Temple<br><i>Luke 2:41-47"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    },
    Sunday: {
      title: "Glorious Mysteries",
      mysteries: [
        "Mystery 1: The Resurrection<br><i>Luke 24:1-5",
        "Mystery 2: The Ascension<br><i>Mark 16:19",
        "Mystery 3: The Descent of the Holy Spirit<br><i>Acts 2:1-4",
        "Mystery 4: The Assumption<br><i>Luke 1:48-49",
        "Mystery 5: The Coronation of Mary<br><i>Revelations 12:1"
      ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Then say one Our Father, three Jesus Prayers and the Doxology (on the chain). For each decade, recite one Our Father, ten Jesus Prayers, and the Doxology (on the chain). On the medallion, include either a prayer from the heart or a contemplative meditation. Conclude with the Sign of the Cross.</p>"
    }
  },
  // Ecumenical rosary data for Monday through Saturday.
  ecumenical: {
    Monday: {
    title: "Miraculous Healing",
    miracles: [
      "Miracle 1: Jesus Heals the Centurion's Servant <br><i>Luke 7:1-10 and Matthew 8:5-13</i>",
      "Miracle 2:  A Woman Touches Jesus' Garments <br><i>Luke 8: 43-48, Mark 5:25-34 and Matthew 9:20-22</i>",
      "Miracle 3: Jesus Heals the Blind Man with Mud <br><i>Mark 8:22-26</i>",
      "Miracle 4: Jesus Raises Lazarus from the Dead <br><i>John 11:17-44</i>",
      "Miracle 5: Jesus Heals Ten Men with Leprosy <br><i>Luke 17:11-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    },
    Tuesday: {
    title: "Miraculous Acts",
    miracles: [
      "Miracle 1: Jesus Turns Water into Wine<br><i>John 2:1-11</i>",
      "Miracle 2: Jesus Calms the Storm <br><i>Matthew 8:18, 23-27, Mark 4:35-41, and Luke 8:22-25</i>",
      "Miracle 3: Jesus Feeds the Five Thousand <br><i>Matthew 14:15-21, Luke 9:12-17, John 6:4-13 and Mark 6:35-44</i>",
      "Miracle 4: Jesus Walks on Water  <br><i>Mark 6:47-52, Matthew 14:24-33 and John 6:16-21</i>",
      "Miracle 5: The Withered Fig Tree <br><i>Mark 11:19-25 and Matthew 21:19-22</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    },
    Wednesday: {
    title: "Miraculous Appearances",
    miracles: [
      "Miracle 1: Jesus Becomes Incarnate by the Holy Spirit from the Virgin Mary (Annunciation)<br><i>Luke 1:26-56</i>",
      "Miracle 2: Transfiguration <br><i>Matthew 17:1-9, Luke 9:28-36 and Mark 9:2-10</i>",
      "Miracle 3: Jesus Appears to Mary Magdalene <br><i>John 20:11-18 and Mark 16:9-11</i>",
      "Miracle 4: Jesus Appears to Doubting Thomas <br><i>John 20:26-31</i>",
      "Miracle 5: Jesus Appears to Paul <br><i>Acts 9:1-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    },
    Thursday: {
    title: "Miraculous Healing",
    miracles: [
      "Miracle 1: Jesus Heals the Centurion's Servant <br><i>Luke 7:1-10 and Matthew 8:5-13</i>",
      "Miracle 2:  A Woman Touches Jesus' Garments <br><i>Luke 8: 43-48, Mark 5:25-34 and Matthew 9:20-22</i>",
      "Miracle 3: Jesus Heals the Blind Man with Mud <br><i>Mark 8:22-26</i>",
      "Miracle 4: Jesus Raises Lazarus from the Dead <br><i>John 11:17-44</i>",
      "Miracle 5: Jesus Heals Ten Men with Leprosy <br><i>Luke 17:11-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    },
    Friday: {
    title: "Miraculous Acts",
    miracles: [
      "Miracle 1: Jesus Turns Water into Wine<br><i>John 2:1-11</i>",
      "Miracle 2: Jesus Calms the Storm <br><i>Matthew 8:18, 23-27, Mark 4:35-41, and Luke 8:22-25</i>",
      "Miracle 3: Jesus Feeds the Five Thousand <br><i>Matthew 14:15-21, Luke 9:12-17, John 6:4-13 and Mark 6:35-44</i>",
      "Miracle 4: Jesus Walks on Water  <br><i>Mark 6:47-52, Matthew 14:24-33 and John 6:16-21</i>",
      "Miracle 5: The Withered Fig Tree <br><i>Mark 11:19-25 and Matthew 21:19-22</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    },
    Saturday: {
    title: "Miraculous Appearances",
    miracles: [
      "Miracle 1: Jesus Becomes Incarnate by the Holy Spirit from the Virgin Mary (Annunciation)<br><i>Luke 1:26-56</i>",
      "Miracle 2: Transfiguration <br><i>Matthew 17:1-9, Luke 9:28-36 and Mark 9:2-10</i>",
      "Miracle 3: Jesus Appears to Mary Magdalene <br><i>John 20:11-18 and Mark 16:9-11</i>",
      "Miracle 4: Jesus Appears to Doubting Thomas <br><i>John 20:26-31</i>",
      "Miracle 5: Jesus Appears to Paul <br><i>Acts 9:1-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
    }
    // Note: Ecumenical Sunday is handled separately below.
  }
};

// Data for Ecumenical Sunday when a season is selected
const ecumenicalSundayData = {
  advent: {
    title: "Miraculous Healing",
    miracles: [
      "Miracle 1: Jesus Heals the Centurion's Servant <br><i>Luke 7:1-10 and Matthew 8:5-13</i>",
      "Miracle 2:  A Woman Touches Jesus' Garments <br><i>Luke 8: 43-48, Mark 5:25-34 and Matthew 9:20-22</i>",
      "Miracle 3: Jesus Heals the Blind Man with Mud <br><i>Mark 8:22-26</i>",
      "Miracle 4: Jesus Raises Lazarus from the Dead <br><i>John 11:17-44</i>",
      "Miracle 5: Jesus Heals Ten Men with Leprosy <br><i>Luke 17:11-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
  },
  lent: {
    title: "Miraculous Acts",
    miracles: [
      "Miracle 1: Jesus Turns Water into Wine<br><i>John 2:1-11</i>",
      "Miracle 2: Jesus Calms the Storm <br><i>Matthew 8:18, 23-27, Mark 4:35-41, and Luke 8:22-25</i>",
      "Miracle 3: Jesus Feeds the Five Thousand <br><i>Matthew 14:15-21, Luke 9:12-17, John 6:4-13 and Mark 6:35-44</i>",
      "Miracle 4: Jesus Walks on Water  <br><i>Mark 6:47-52, Matthew 14:24-33 and John 6:16-21</i>",
      "Miracle 5: The Withered Fig Tree <br><i>Mark 11:19-25 and Matthew 21:19-22</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
  },
  easter: {
    title: "Miraculous Appearances",
    miracles: [
      "Miracle 1: Jesus Becomes Incarnate by the Holy Spirit from the Virgin Mary (Annunciation)<br><i>Luke 1:26-56</i>",
      "Miracle 2: Transfiguration <br><i>Matthew 17:1-9, Luke 9:28-36 and Mark 9:2-10</i>",
      "Miracle 3: Jesus Appears to Mary Magdalene <br><i>John 20:11-18 and Mark 16:9-11</i>",
      "Miracle 4: Jesus Appears to Doubting Thomas <br><i>John 20:26-31</i>",
      "Miracle 5: Jesus Appears to Paul <br><i>Acts 9:1-19</i>"
    ],
      prayerDetails: "<p><strong>Order:</strong> Begin with the Sign of the Cross. Recite the Nicene Creed (on the crucifix), then say one Our Father, followed by three Greatest Commandments and one Great Commission. For each decade, recite on the first bead the Great Commission combined with the Lord's Prayer, then recite the Greatest Commandment (×10). Conclude on the medallion with the Jesus Prayer.</p>"
  }
};

/*
  Common prayer order explanations (summaries) for each rosary type.
  These appear once after the variation-specific order explanation.
*/
const commonPrayerOrders = {
  traditional: `<p><strong>Common Order Explanation (Traditional):</strong></p>
    <p>Sign of the Cross, Apostles’ Creed, Our Father, Jesus Prayer, Glory Be, and Hail Holy Queen as indicated.</p>`,
  lutheran: `<p><strong>Common Order Explanation (Lutheran):</strong></p>
    <p>Sign of the Cross, Apostles’ Creed, Our Father, Jesus Prayer, Doxology, and medallion option (Prayer from the Heart OR Pre-Trent Hail Mary) as indicated.</p>`,
  ecumenical: `<p><strong>Common Order Explanation (Ecumenical):</strong></p>
    <p>Nicene Creed, Our Father, Jesus Prayer, Doxology, and for each decade: Great Commission + Lord's Prayer on the first bead then Greatest Commandment (×10); medallion: Jesus Prayer.</p>`,
  modified: `<p><strong>Common Order Explanation (Modified):</strong></p>
    <p>Sign of the Cross, (No Creed), Our Father, Jesus Prayer, Doxology; for each decade: Our Father, Jesus Prayer, Doxology; medallion: Prayer from the Heart OR Contemplative Meditation; finish with the Sign of the Cross.</p>`
};

/*
  Separate data structure for the full texts of the individual prayers for each rosary type.
  Only the prayers used by that type are included.
*/
const prayerTextsByType = {
  traditional: `
    <p><strong>Sign of the Cross:</strong> In the name of the Father, and of the Son, and of the Holy Spirit. Amen.</p><br>
    <p><strong>Apostles' Creed:</strong> I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.</p><br>
    <p><strong>Our Father:</strong> Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.</p><br>
    <p><strong>Hail Mary:</strong> Hail, Mary, full of grace, the Lord is with thee. Blessed art thou among women and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.</p><br>
    <p><strong>Glory Be:</strong> Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.</p><br>
    <p><strong>Hail Holy Queen:</strong> HHail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.</p><br>
  `,
  lutheran: `
    <p><strong>Sign of the Cross:</strong> In the name of the Father, and of the Son, and of the Holy Spirit. Amen.</p><br>
    <p><strong>Apostles' Creed:</strong> I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.</p><br>
    <p><strong>Our Father:</strong> Our Father who art in heaven, hallowed be Thy name, Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom and the power and the glory forever and ever. Amen.</p><br>
    <p><strong>Jesus Prayer:</strong> Lord Jesus Christ, Son of God, have mercy on me, a sinner.</p><br>
    <p><strong>Doxology:</strong> Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.</p><br>
    <p><strong>Pre-Trent Hail Mary:</strong> Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women and blessed is the fruit of thy womb, Jesus.</p><br>
  `,
  ecumenical: `
    <p><strong>Sign of the Cross:</strong> In the name of the Father, and of the Son, and of the Holy Spirit. Amen.</p><br>
    <p><strong>Nicene Creed:</strong> We believe in one God, the Father, the Almighty, maker of heaven and earth, of all that is, seen and unseen. We believe in one Lord, Jesus Christ, the only Son of God, eternally begotten of the Father, God from God, Light from Light, true God from true God, begotten, not made, of one Being with the Father; through him all things were made. For us and for our salvation he came down from heaven, was incarnate of the Holy Spirit and the Virgin Mary and became truly human. For our sake he was crucified under Pontius Pilate; he suffered death and was buried. On the third day he rose again in accordance with the Scriptures; he ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead, and his kingdom will have no end. We believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is worshiped and glorified, who has spoken through the prophets. We believe in one holy catholic and apostolic Church. We acknowledge one baptism for the forgiveness of sins. We look for the resurrection of the dead, and the life of the world to come. Amen </p><br>
    <p><strong>Lord's Prayer:</strong> Our Father who art in heaven, hallowed be Thy name, Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom and the power and the glory forever and ever. Amen.</p><br>
    <p><strong>Greatest Commandment:</strong> Sweet Jesus, I love you with all my heart and all my soul, Help me to serve my family, and everyone else I meet today.</p><br>
    <p><strong>Great Commission:</strong> Oh my lord, I know that you are always with me, help me to obey your commandments, And lead me to share my faith with others, so that they may know you and love you.</p><br>
    <p><strong>Jesus Prayer:</strong> Lord Jesus Christ, Son of God, have mercy on me, a sinner.</p><br>
  `,
  modified: `
    <p><strong>Sign of the Cross:</strong> In the name of the Father, and of the Son, and of the Holy Spirit. Amen.</p><br>
    <p><strong>Our Father:</strong> Our Father who art in heaven, hallowed be Thy name, Thy kingdom come, Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. For Thine is the kingdom and the power and the glory forever and ever. Amen.</p><br>
    <p><strong>Jesus Prayer:</strong> Lord Jesus Christ, Son of God, have mercy on me, a sinner.</p><br>
    <p><strong>Doxology:</strong> Glory be to the Father and to the Son and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, a world without end. Amen.</p><br>
  `
};

/*
  Helper function that composes and displays the complete prayer text.
  It concatenates:
    1. The variation-specific prayerDetails (order explanation)
    2. The common prayer order explanation for that rosary type
    3. The full texts for the prayers (specific to that type)
*/
function displayResults(selectedData) {
  document.getElementById('titleMysteries').textContent = selectedData.title;
  const container = document.getElementById('mysteriesContainer');
  container.innerHTML = "";
  // Use "miracles" if present; otherwise, use "mysteries"
  const items = selectedData.miracles || selectedData.mysteries;
  items.forEach(function(item) {
    // Allow HTML tags (like <br>) by setting innerHTML instead of textContent.
    const div = document.createElement('div');
    div.className = "mystery";
    div.innerHTML = item;
    container.appendChild(div);
  });
  // Build the complete prayer text by concatenating the variation-specific order,
  // the common order explanation, and the full prayer texts.
  const completePrayerText = selectedData.prayerDetails + "<br>" + "<br>" + "<b>Prayer Text</b>" + "<br>" + 
                             // commonPrayerOrders[currentRosaryType] +
                              prayerTextsByType[currentRosaryType];
  document.getElementById('prayerDetails').innerHTML = completePrayerText;
  document.getElementById('results-screen').style.display = "block";
}

// Event listener for the "Start Praying" link on the start screen.
document.getElementById('startPraying').addEventListener('click', function(e) {
  e.preventDefault();
  
  const day = document.getElementById('daySelect').value;
  const rosaryType = document.getElementById('rosarySelect').value;
  
  // Store the current rosary type for later use in appending the common prayer order
  currentRosaryType = rosaryType;
  
  // If Ecumenical Rosary and Sunday are selected, show the season screen.
  if (rosaryType === "ecumenical" && day === "Sunday") {
    document.getElementById('start-screen').style.display = "none";
    document.getElementById('season-screen').style.display = "block";
  } else {
    // Otherwise, retrieve data from rosaryData (defaulting to Traditional Monday if not found)
    const selectedData = (rosaryData[rosaryType] && rosaryData[rosaryType][day]) ||
                         rosaryData["traditional"]["Monday"];
    document.getElementById('start-screen').style.display = "none";
    displayResults(selectedData);
  }
});

// Event listener for the "Continue" link on the season screen.
document.getElementById('continueSeason').addEventListener('click', function(e) {
  e.preventDefault();
  
  const season = document.getElementById('seasonSelect').value;
  if (!season) {
    alert("Please select a season.");
    return;
  }
  // For Ecumenical Sunday, the current rosary type remains "ecumenical"
  currentRosaryType = "ecumenical";
  const selectedData = ecumenicalSundayData[season];
  document.getElementById('season-screen').style.display = "none";
  displayResults(selectedData);
});

// Event listener for "Show Prayer Details" on the results screen.
document.getElementById('toggleExpanded').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('expandedSection').style.display = "block";
});

// Event listener for the "Back" link in the expanded details section.
document.getElementById('backToResults').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('expandedSection').style.display = "none";
});

// Event listener for the "Back" link on the results screen (returns to the start screen).
document.getElementById('backToStart').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('results-screen').style.display = "none";
  document.getElementById('expandedSection').style.display = "none";
  document.getElementById('start-screen').style.display = "block";
});
